"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";

import { useStoreModal } from "@/hooks/use-store-modal";
import Modal from "@/components/ui/modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const formSchema = z.object({
	name: z.string().min(3).max(255),
});
export default function StoreModal() {
	const storeModal = useStoreModal();
	// zodResolver is being used to connect the Zod schema (formSchema) to the form validation process.
	const form = useForm<z.infer<typeof formSchema>>({
		defaultValues: { name: "" },
		resolver: zodResolver(formSchema),
	});

	const handleSubmit = (data: z.infer<typeof formSchema>) => {
		// Submit form data to the server here
		console.log(data);
		storeModal.onClose();
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
								<Button variant="outline" onClick={storeModal.onClose}>
									Cancel
								</Button>
								<Button type="submit">Continue</Button>
							</div>
						</form>
					</Form>
				</div>
			</div>
		</Modal>
	);
}
