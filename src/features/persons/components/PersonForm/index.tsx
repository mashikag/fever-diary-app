import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { personSchema } from "./schema";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { toast } from "sonner";
import { useEffect } from "react";

type PersonFormValues = z.infer<typeof personSchema>;

export interface PersonFormProps {
  onSubmit: (values: PersonFormValues) => Promise<void>;
  defaultValues?: Partial<PersonFormValues>;
}

function PersonForm({ onSubmit, defaultValues }: PersonFormProps) {
  const form = useForm<PersonFormValues>({
    resolver: zodResolver(personSchema),
    defaultValues: {
      name: defaultValues?.name ?? "",
      dateOfBirth: defaultValues?.dateOfBirth,
      weight: defaultValues?.weight,
    },
  });

  async function handleSubmit(values: PersonFormValues) {
    try {
      await onSubmit(values);
      toast.success("Person saved successfully!");
    } catch (e) {
      toast.error("Failed to save person.");
      console.error(e);
    }
  }

  useEffect(() => {
    // Fixes an issue where the stale defaultValues are used, the first time the user comes back to the form after an edit
    form.reset(defaultValues);
  }, [defaultValues, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Birth</FormLabel>
              <FormControl>
                <DateTimePicker value={field.value} onChange={field.onChange} granularity="day" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="weight"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Weight (kg)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.1"
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Save Person</Button>
      </form>
    </Form>
  );
}

export default PersonForm;
