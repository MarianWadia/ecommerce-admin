"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import axios from "axios";

import { useStoreModal } from "@/hooks/use-store-modal";
import Modal from "@/components/ui/modal";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
	name: z.string().min(3).max(255),
});
export default function StoreModal() {
	const storeModal = useStoreModal();
	const [loading, setLoading] = useState<boolean>(false);
	const router = useRouter();
	// zodResolver is being used to connect the Zod schema (formSchema) to the form validation process.
	const form = useForm<z.infer<typeof formSchema>>({
		defaultValues: { name: "" },
		resolver: zodResolver(formSchema),
	});

	const handleSubmit = async (data: z.infer<typeof formSchema>) => {
		// Submit form data to the server here
		try {
			setLoading(true);
			const response = await axios.post("/api/stores", data);
			console.log(
				"Store created successfully:",
				response.status,
				response.data
			);
			if (response.status === 200) {
				form.reset();
				storeModal.onClose();
				window.location.assign(`/${response?.data?.id}`);
			}
		} catch (error) {
			toast.error("Something went wrong");
			console.log("Error from submit store:", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Modal
			title="Create Store"
			description="Add a new store to manage products and categories"
			isOpen={storeModal.isOpen}
			onClose={storeModal.onClose}
		>
			<div>
				<div className="py-3">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(handleSubmit)}>
							<FormField
								name="name"
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input placeholder="E-Commerce" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="w-full flex flex-row items-center gap-x-3 justify-end capitalize pt-4">
								<Button
									disabled={loading}
									variant="outline"
									onClick={storeModal.onClose}
								>
									Cancel
								</Button>
								<Button disabled={loading} type="submit">
									Continue
								</Button>
							</div>
						</form>
					</Form>
				</div>
			</div>
		</Modal>
	);
}
