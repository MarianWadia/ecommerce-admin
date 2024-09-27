"use client";

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
import { zodResolver } from "@hookform/resolvers/zod";
import { Store } from "@prisma/client";
import { TrashIcon } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface settingsFormProps {
	initialData: Store;
}

const formSchema = z.object({
	name: z.string().min(1),
});

type SettingsFormsValues = z.infer<typeof formSchema>;

export default function SettingsForm({ initialData }: settingsFormProps) {
	const form = useForm<SettingsFormsValues>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData,
	});
	const [loading, setLoading] = useState<boolean>(false);
	const [open, setOpen] = useState<boolean>(false);
	async function onSubmit(data: SettingsFormsValues) {
		console.log("data: ", data);
	}
	return (
		<>
			<div className="flex items-center justify-between">
				<Heading title="Settings" description="Manage store preferences" />
				<Button disabled={loading} variant="destructive" size="icon" onClick={() => setOpen(true)}>
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
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											disabled={loading}
											placeholder="Store name"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Button type="submit" disabled={loading}>
						Save Changes
					</Button>
				</form>
			</Form>
		</>
	);
}
