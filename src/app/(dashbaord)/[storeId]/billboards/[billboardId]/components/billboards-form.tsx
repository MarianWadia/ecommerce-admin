"use client";

import AlertModal from "@/components/modals/alert-modal";
import ApiAlert from "@/components/ui/apiAlert";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import Heading from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import UseOrigin from "@/hooks/use-origin";
import { zodResolver } from "@hookform/resolvers/zod";
import { Billboard, Store } from "@prisma/client";
import axios from "axios";
import { TrashIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

interface billboardsFormProps {
	initialData: Billboard | null;
}

const formSchema = z.object({
	label: z.string().min(1),
    imageUrl: z.string().min(1),

});

type BillboardsFormsValues = z.infer<typeof formSchema>;

export default function BillboardsForm({ initialData }: billboardsFormProps) {
	const router = useRouter();
	const { storeId } = useParams();
	const  origin = UseOrigin() 
	const form = useForm<BillboardsFormsValues>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData || {
            label: "",
            imageUrl: ""
        },
	});
	const [loading, setLoading] = useState<boolean>(false);
	const [open, setOpen] = useState<boolean>(false);

    const title = initialData ? "Edit Billboard" : "Create Billboard";
    const description = initialData ? "Edit a Billboard" : "Add a new Billboard";
    const toastMessage = initialData ? "Billboard updated" : "Billboard created";
    const actionBtn = initialData ? "Save changes" : "Create";

	async function onSubmit(data: BillboardsFormsValues) {
		try {
			setLoading(true);
			await axios.patch(`/api/stores/${storeId}`, data);
			router.refresh();
			toast.success(toastMessage);
		} catch (error) {
			console.log("error: ", error);
			toast.error("Something went wrong");
		} finally {
			setLoading(false);
		}
	}
	async function handleDeleteStore() {
		try {
			setLoading(true);
			await axios.delete(`/api/stores/${storeId}`);
			router.refresh();
			router.push("/");
			toast.success("Store deleted successfully");
		} catch (error) {
			console.log(error);
			toast.error("Make sure you delete all products and categories first");
		} finally {
			setLoading(false);
			setOpen(false);
		}
	}
	return (
		<>
			<AlertModal
				onClose={() => setOpen(false)}
				onConfirm={handleDeleteStore}
				isOpen={open}
				loading={loading}
			/>
			<div className="flex items-center justify-between">
				<Heading title={title} description={description} />
				<Button
					disabled={loading}
					variant="destructive"
					size="icon"
					onClick={() => setOpen(true)}
				>
					<TrashIcon className="w-5 h-5 text-white" />
				</Button>
			</div>
			<Separator />
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-8 w-full"
				>
					<div className="grid grid-cols-3 gap-8">
						<FormField
							control={form.control}
							name="label"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Label</FormLabel>
									<FormControl>
										<Input
											disabled={loading}
											placeholder="Billboard Label"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Button type="submit" disabled={loading}>
						{actionBtn}
					</Button>
				</form>
			</Form>
			<Separator />
			{/* <ApiAlert
				title="NEXT_PUBLIC_API_URL"
				description={`${origin}/api/${storeId}`}
				variant="public"
			/> */}
		</>
	);
}
