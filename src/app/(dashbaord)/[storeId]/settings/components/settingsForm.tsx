"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Heading from "@/components/ui/heading";
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
				<Button variant="destructive" size="icon" onClick={() => {}}>
					<TrashIcon className="w-5 h-5 text-white" />
				</Button>
			</div>
			<Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    
                </form>
            </Form>
		</>
	);
}
