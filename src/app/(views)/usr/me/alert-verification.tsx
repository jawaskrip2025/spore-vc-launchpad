import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircleIcon } from "lucide-react";
import Link from "next/link";
import "@zkmelabs/widget/dist/style.css";
import { ZkMeWidget, type Provider } from "@zkmelabs/widget";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useChainId } from "wagmi";
import zkmeService from "@/modules/zkme/zkme.service";
import { useApproveByWalletAddress } from "@/modules/verification/verification.query";

const appId = process.env.ZKME_APP_ID;
const dappName = process.env.ZKME_DAPP_NAME;
const programNo = process.env.ZKME_PROGRAM_NO;

export default function AlertVerification({
  status,
  walletAddress,
}: {
  status?: "PENDING" | "REJECTED" | "APPROVED";
  walletAddress: string;
}) {
  const [zkMeWidget, setZkMeWidget] = useState<ZkMeWidget | null>(null);
  const chainId = useChainId();
  const { mutate: approveByWalletAddress } = useApproveByWalletAddress();

  const provider: Provider = {
    async getAccessToken() {
      return zkmeService.GET_TOKEN();
    },
    async getUserAccounts() {
      if (walletAddress) {
        console.log("Using cached wallet address:", walletAddress);
        return [walletAddress];
      }
      return [];
    },
  };

  // Method

  // Initialize zkMe widget
  function initializeZkMeWidget() {
    try {
      const widget = new ZkMeWidget(
        appId!, // App ID from zkMe dashboard
        dappName!,
        String(chainId),
        provider,
        {
          lv: "zkKYC",
          programNo: programNo,
        }
      );
      console.log("widget", widget);
      widget.on("finished", handleFinished);
      setZkMeWidget(widget);

      console.log("zkMe Widget initialized successfully");
    } catch (error) {
      console.error("Failed to initialize zkMe Widget:", error);
    }
  }

  // Launch zkMe verification
  function launchZkMeVerification() {
    if (zkMeWidget) {
      zkMeWidget.launch();
    } else {
      console.error("zkMe Widget not initialized");
    }
  }

  // Sync verification status with backend
  async function syncVerificationStatus(address: string) {
    try {
      console.log("Syncing verification status...", address);
      approveByWalletAddress({ walletAddress: address });
    } catch (error) {
      console.error("Error syncing verification status:", error);
    }
  }

  function handleFinished(walletAddressZkme: string) {
    console.log("zkMe verification finished:", walletAddressZkme);

    if (walletAddressZkme === walletAddress.toLowerCase()) {
      // Verification successful
      toast.success("Verification Success", {
        description: "Your account has been verified and is being processed.",
        position: "top-right",
      });

      // Optionally call API to sync verification status
      syncVerificationStatus(walletAddressZkme);
    } else if (walletAddressZkme !== walletAddress.toLowerCase()) {
      // Different wallet address
      toast.error("Validation Error", {
        description:
          "Verifikasi menggunakan wallet address yang berbeda.\nSilakan verifikasi dengan wallet yang sama.",
        position: "top-right",
      });
    } else {
      // Verification failed or denied
      toast.error("Validation Error", {
        description:
          "Verifikasi zkKYC gagal atau dibatalkan.\nSilakan coba lagi.",
        position: "top-right",
      });
    }
  }

  // Life cycle
  useEffect(() => {
    initializeZkMeWidget();
  }, [chainId]);

  return (
    <>
      {!status && (
        <Alert
          variant="destructive"
          className="bg-red-500/20 text-red-600 border-none"
        >
          <AlertCircleIcon />
          <AlertTitle>
            <b>Your Account Not Verified!</b>
          </AlertTitle>
          <AlertDescription>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                Please verify your account to create assets.
              </div>
              <Button
                variant={"default"}
                size={"sm"}
                onClick={launchZkMeVerification}
              >
                Verify Now
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}
      {status === "REJECTED" && (
        <Alert
          variant="destructive"
          className="bg-red-500/20 text-red-600 border-none"
        >
          <AlertCircleIcon />
          <AlertTitle>
            <b>Your Account Not Verified!</b>
          </AlertTitle>
          <AlertDescription>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                Please verify your account to create assets.
              </div>
              <Button variant={"default"} size={"sm"} asChild>
                <Link href={"/usr/verification"}>Update Document</Link>
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}
    </>
  );
}
