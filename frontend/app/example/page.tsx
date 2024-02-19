"use client";

import * as React from "react";
import { collection, item } from "phosphor";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const Page = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { createCollection } = collection;
    createCollection({
      name: values.name,
      deploymentRequest: {
        networkId: 5,
        platform: {
          variant: {
            name: "FlexibleERC1155",
            tokenIDAssignmentStrategy: "MANUAL",
          },
          symbol: "SHAD",
        },
      },
    });
  }

  async function createItemCall() {
    const { createItem, editItem } = item;

    const resp = await createItem({
      collectionId: "020a4a10-cfd2-4601-bf01-d24d5e095715",
      attributes: {
        title: "title",
        description: "description",
        image_url:
          "https://images.freeimages.com/images/large-previews/527/bird-1361326.jpg?fmt=webp&w=500",
        otherAttributes: {
          isFinite: true,
          isMinted: null,
          num: 3,
        },
      },
    });

    console.log(await resp.json());
  }

  async function editItemCall() {
    const { editItem } = item;

    const resp = await editItem({
      itemId: "7642f788-3971-4b08-990e-4e2c100f8c13",

      attributes: {
        title: "title3",
        description: "description2",
      },
    });

    console.log(await resp.json());
  }

  // async function editItemMeta() {
  //   const { editItemMetadata } = item;

  //   const resp = await editItemMetadata({
  //     items: [  {
  //       itemId: "7642f788-3971-4b08-990e-4e2c100f8c13",
  //       attributes: {
  //         title: "titleXX",
  //         description: "description2",
  //       },
  //     }, 
  //     {
  //       itemId: "e580f392-f257-49fa-9930-bf045c4b0c79",
  //       attributes: {
  //         title: "titleYYY",
  //         description: "description2",
  //       },
  //     },],
  //   });

  //   console.log(await resp.json());
  // }

  async function lock() {
    const { lockItems } = item;

    const resp = await lockItems({
      collectionId: "020a4a10-cfd2-4601-bf01-d24d5e095715"
    });

    console.log(await resp.json());
  }

  async function minted() {
    const { mintItems } = item;

    const resp = await mintItems({
      itemId: "e580f392-f257-49fa-9930-bf045c4b0c79",
      toAddress: "0x4817b6eB2cB0c9e88A2c46C142E3a94011Df7126"
    });

    console.log(await resp.json());
  }



  async function checkMinted() {
    const { checkMintRequest } = item;

    const resp = await checkMintRequest("10bd056f-df7f-4cc5-baec-96e8cd64f744");

    console.log(await resp.json());
  }

  async function del() {
    const { deleteItem } = item;

    const resp = await deleteItem("7642f788-3971-4b08-990e-4e2c100f8c13");

    console.log(await resp.json());
  }

  // async function list() {
  //   const { createListing } = listing

  //   const resp = await createListing({
  //     currency: "ETH",
  //     maxQuantityPerTx: 1,
  //     paymentProviders: ["BETA_FREE_MINT"],
  //     policy: {
  //       ethAddresses: ["0x4817b6eB2cB0c9e88A2c46C142E3a94011Df7126"],
  //       txPayer: "BUYER"
  //     },
  //     price: "1000000000000000000",
  //     tokenIds: ["e580f392-f257-49fa-9930-bf045c4b0c79"],
  //     settlementCurrency: {
  //       "MINT_VOUCHER": "ETH"
  //     }
  //   })

  //   console.log(await resp.json());

  // }

  return (
    <Button>
      Create Collection
    </Button>
  );
};

export default Page;
