"use client";

import { FormInput } from "@/components/form-input";
import { FormSelect } from "@/components/form-select";
import { Icon } from "@/components/icon";
import { ImageDropzone } from "@/components/image-dropzone";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { categories, units } from "@/data/category";
import { chains } from "@/data/chain";
import { db } from "@/lib/db";
import { converToIpfs, pinata } from "@/lib/pinata";
import { TFormToken } from "@/models/token";
import { formTokenSchema } from "@/models/token/schema";
import { useCheckAuth } from "@/modules/auth/auth.query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useWeb3AuthConnect } from "@web3auth/modal/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import LoadingConnect from "../_components/loading-connect";
import MustConnect from "../_components/must-connect";

export default function FormToken() {
  const { data: isLoggedIn, isLoading } = useCheckAuth();
  const { isConnected } = useWeb3AuthConnect();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);

  const form = useForm<TFormToken>({
    resolver: zodResolver(formTokenSchema),
    defaultValues: {
      status: "PENDING",
      name: "",
      symbol: "",
      category: "",
      chain: "",
      description: "",
      allocations: [
        {
          allocation: "Presale",
          supply: 0,
          vesting: 1,
          start_date: "",
        },
      ],
      presales: [
        {
          hardCap: 0,
          pricePerToken: 0,
          unit: "",
          maxContribution: 0,
          duration: "",
        },
      ],
      socials: [
        { name: "X", url: "" },
        { name: "Discord", url: "" },
        { name: "Website", url: "" },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "allocations",
  });
  const { fields: presalesFields } = useFieldArray({
    control: form.control,
    name: "presales",
  });
  const {
    fields: socialFields,
    append: appendSocial,
    remove: removeSocial,
  } = useFieldArray({
    control: form.control,
    name: "socials",
  });

  const allocations = form.watch("allocations");
  const totalPercent = allocations.reduce(
    (sum, a) => sum + Number(a.supply || 0),
    0
  );

  async function uploadFile() {
    const urlRequest = await fetch("/api/upload");
    const urlResponse = await urlRequest.json();
    if (!file) {
      alert("Upload image please!");
      return;
    }
    const upload = await pinata.upload.public.file(file).url(urlResponse.url);
    const url = converToIpfs(upload.cid);
    return url;
  }
  async function onSubmit(values: TFormToken) {
    setLoading(true);
    try {
      const fileUrl = await uploadFile();
      const newValues = {
        ...values,
        id: Date.now().toString(),
        file: fileUrl,
      };
      await db.tokens.add(newValues);
      toast.success("Success", {
        description:
          '"Token has been submited, and waiting review lattice team!"',
      });
      router.push("/");
    } catch {
      toast.error("Failed to save token");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {isLoading ? (
        <LoadingConnect />
      ) : (
        <>
          {isConnected && isLoggedIn ? (
            <div className="max-w-4xl mx-auto py-12 px-3">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-44 h-44 shrink-0 mx-auto md:mx-0">
                      <ImageDropzone
                        className="aspect-square"
                        onChange={(file) => setFile(file)}
                      />
                    </div>
                    <div className="flex-1 space-y-4">
                      <FormInput
                        control={form.control}
                        name="name"
                        label="Name"
                        placeholder="Enter name"
                      />
                      <FormInput
                        control={form.control}
                        name="symbol"
                        label="Ticker"
                        placeholder="Enter ticker"
                      />
                    </div>
                  </div>
                  <FormSelect
                    control={form.control}
                    name="chain"
                    label="Select Chain"
                    placeholder="select chain"
                    groups={chains}
                  />
                  <FormSelect
                    control={form.control}
                    name="category"
                    label="Select Category"
                    placeholder="select category"
                    groups={categories}
                  />
                  <FormInput
                    control={form.control}
                    name="supply"
                    label="Total Supply"
                    type="number"
                    placeholder="Enter Supply"
                  />
                  <FormInput
                    control={form.control}
                    name="description"
                    isLongText
                    label="Description"
                    placeholder="Enter Description"
                  />
                  <div className="bg-primary-foreground/50 p-4 rounded-lg mb-12">
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold">
                        Website / Social Media
                      </h3>
                      {socialFields.map((field, index) => (
                        <div key={field.id} className="flex items-end gap-2">
                          <FormInput
                            control={form.control}
                            name={`socials.${index}.name`}
                            label="Platform"
                            placeholder="e.g. Twitter"
                          />
                          <div className="flex-1">
                            <FormInput
                              control={form.control}
                              name={`socials.${index}.url`}
                              label="URL"
                              placeholder={`e.g. https://${field.name.toLowerCase()}.com/account`}
                            />
                          </div>
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            onClick={() => removeSocial(index)}
                          >
                            <Icon name="tabler:trash" />
                          </Button>
                        </div>
                      ))}
                      <div className="flex justify-end pt-2">
                        <Button
                          type="button"
                          onClick={() => appendSocial({ name: "", url: "" })}
                          variant="secondary"
                        >
                          + Add Social
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-primary-foreground/50 p-4 rounded-lg">
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold">Allocations</h3>
                      <div>
                        {fields.map((field, index) => (
                          <div
                            key={field.id}
                            className="flex flex-col md:flex-row gap-2 md:items-end space-y-2"
                          >
                            <div className="flex-1">
                              <FormInput
                                control={form.control}
                                name={`allocations.${index}.allocation`}
                                label="Allocation"
                                placeholder="e.g. Team"
                              />
                            </div>
                            <div className="flex-1">
                              <FormInput
                                control={form.control}
                                name={`allocations.${index}.supply`}
                                label="Supply (%)"
                                placeholder="e.g. 1000"
                                type="number"
                              />
                            </div>
                            <div className="flex-1">
                              <FormInput
                                control={form.control}
                                name={`allocations.${index}.vesting`}
                                label="Vesting (mo)"
                                placeholder="e.g. 6"
                                type="number"
                              />
                            </div>
                            <div className="flex-1">
                              <FormInput
                                control={form.control}
                                name={`allocations.${index}.start_date`}
                                label="Start Date"
                                placeholder="e.g. 6"
                                type="date"
                              />
                            </div>
                            <Button
                              disabled={index < 1}
                              className="ms-auto"
                              size={"icon"}
                              type="button"
                              variant="destructive"
                              onClick={() => remove(index)}
                            >
                              <Icon name="tabler:trash" />
                            </Button>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between">
                        <p
                          className={`text-xs font-semibold ${
                            totalPercent !== 100
                              ? "text-red-500"
                              : "text-green-600"
                          }`}
                        >
                          Total Allocation: {totalPercent}%
                        </p>
                        {totalPercent !== 100 && (
                          <p className="text-xs font-semibold">
                            Total Allocation Must be 100%
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-end mt-2">
                      <Button
                        variant="secondary"
                        disabled={totalPercent >= 100}
                        type="button"
                        onClick={() =>
                          append({
                            allocation: "",
                            supply: 0,
                            start_date: "",
                            vesting: 0,
                          })
                        }
                      >
                        + Allocation
                      </Button>
                    </div>
                  </div>
                  <div className="bg-primary-foreground/50 p-4 rounded-lg">
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold">Presales Info</h3>
                      <div>
                        {presalesFields.map((field, index) => (
                          <div
                            key={field.id}
                            className="grid grid-cols-3 gap-3"
                          >
                            <FormInput
                              control={form.control}
                              name={`presales.${index}.hardCap`}
                              label="Hard Cap"
                              type="number"
                              placeholder="e.g. 100000"
                            />
                            <FormInput
                              control={form.control}
                              name={`presales.${index}.pricePerToken`}
                              label="Price Per Token"
                              type="number"
                              placeholder="e.g. 0.01"
                            />
                            <FormSelect
                              control={form.control}
                              name={`presales.${index}.unit`}
                              label="Token"
                              placeholder="e.g.USDT"
                              groups={units}
                            />
                            <FormInput
                              control={form.control}
                              name={`presales.${index}.maxContribution`}
                              label="Max Contribution"
                              type="number"
                              placeholder="e.g. 500"
                            />
                            <FormInput
                              control={form.control}
                              name={`presales.${index}.duration`}
                              label="Duration"
                              type="datetime-local"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 justify-end sticky bottom-0 py-3 z-20 backdrop-blur border-t">
                    <Button
                      onClick={() => router.back()}
                      variant={"outline"}
                      size={"lg"}
                      type="button"
                    >
                      Cancel
                    </Button>
                    <Button
                      disabled={totalPercent !== 100 || loading}
                      size={"lg"}
                      type="submit"
                    >
                      {loading && (
                        <Icon
                          name="mingcute:loading-3-fill"
                          className="animate-spin"
                        />
                      )}
                      Submit
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          ) : (
            <MustConnect />
          )}
        </>
      )}
    </>
  );
}
