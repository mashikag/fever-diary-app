import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newEntrySchema } from "./schema";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import PersonCombobox from "@/features/persons/components/PersonCombobox";
import { DateTimePicker, TimePicker } from "@/components/ui/date-time-picker";

type NewEntryFormValues = z.infer<typeof newEntrySchema>;

function NewEntryForm() {
  const form = useForm<NewEntryFormValues>({
    resolver: zodResolver(newEntrySchema),
    defaultValues: {
      date: new Date(),
      personId: "",
      temperature: undefined,
      medicationType: undefined,
      medicationDosage: undefined,
    },
  });

  function onSubmit(values: NewEntryFormValues) {
    // Handle form submission
    console.log("Submitting values", values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => {
            const handleDateTimeChange = (date?: Date) => {
              if (!date) return;

              console.log(date);
              form.setValue("date", date);
            };

            return (
              <FormItem className="grid grid-cols-2 gap-x-8 justify-start">
                <FormLabel className="text-left">Date</FormLabel>
                <FormLabel className="text-left">Time</FormLabel>
                <FormControl className="text-left">
                  <DateTimePicker
                    value={field.value}
                    onChange={handleDateTimeChange}
                    granularity="day"
                  />
                </FormControl>
                <FormControl className="justify-start">
                  <TimePicker
                    date={field.value}
                    onChange={handleDateTimeChange}
                    hourCycle={24}
                    granularity="minute"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="personId"
          render={({ field }) => {
            const handlePersonNameChange = (personName: string) => {
              console.log(personName);
              field.onChange(personName);
            };

            return (
              <FormItem className="flex flex-col items-start">
                <FormLabel>Person Name</FormLabel>
                <FormControl>
                  <PersonCombobox
                    value={field.value}
                    onChange={handlePersonNameChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="temperature"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel>Temperature (°C)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter temperature"
                  min={35}
                  max={43}
                  step={0.1}
                  value={field.value ?? ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    console.log("value", value);
                    if (value === "" && e.target.validity.badInput) {
                      return;
                    }

                    field.onChange(parseFloat(value));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="medicationType"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel>Medication Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select medication type" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  <SelectItem value="ibuprofen">Ibuprofen</SelectItem>
                  <SelectItem value="paracetamol">Paracetamol</SelectItem>
                  <SelectItem value="aspirin">Aspirin</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="medicationDosage"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel>Medication Dosage (mg)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter dosage"
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Add entry</Button>
      </form>
    </Form>
  );
}

export default NewEntryForm;
