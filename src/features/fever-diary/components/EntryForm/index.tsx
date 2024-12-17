import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { entrySchema } from "./schema";
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
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export type EntryFormValues = z.infer<typeof entrySchema>;

export type EntryFormProps = {
  defaultValues?: Partial<EntryFormValues>;
  onSubmit: (values: EntryFormValues) => Promise<void>;
};

const mergeDefaults = (overrides: Partial<EntryFormValues> = {}): EntryFormValues => {
  console.log("mergeDefaults should not re-run on every render. useMemo perhaps?");
  return {
    date: new Date(),
    personId: "",
    temperature: undefined,
    medicationType: undefined,
    medicationDosage: undefined,
    ...overrides,
  };
};

function EntryForm({ defaultValues, onSubmit }: EntryFormProps) {
  const [defaults] = useState(mergeDefaults(defaultValues));
  const [showTemperature, setShowTemperature] = useState(!!defaults.temperature);
  const [showMedication, setShowMedication] = useState(
    !!(defaults.medicationType || defaults.medicationDosage)
  );

  const form = useForm<EntryFormValues>({
    resolver: zodResolver(entrySchema),
    defaultValues: defaults,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 rounded-md p-8">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => {
            const handleDateTimeChange = (date?: Date) => {
              if (!date) return;
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
            return (
              <FormItem className="flex flex-col items-start">
                <FormLabel>Person Name</FormLabel>
                <FormControl>
                  <PersonCombobox value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <div className="flex items-center space-x-2">
          <Switch
            id="temperature-switch"
            checked={showTemperature}
            onCheckedChange={(checked) => {
              setShowTemperature(checked);
              if (!checked) {
                form.setValue("temperature", undefined);
              }
            }}
          />
          <label
            htmlFor="temperature-switch"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Record body temperature
          </label>
        </div>

        <div
          className={`transform transition-all duration-200 ease-in-out ${
            showTemperature ? "opacity-100 max-h-24" : "opacity-0 max-h-0 overflow-hidden"
          }`}
        >
          <FormField
            control={form.control}
            name="temperature"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Temperature (°C)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="37.5"
                    step="0.1"
                    {...field}
                    onChange={(e) =>
                      field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="medication-switch"
            checked={showMedication}
            onCheckedChange={(checked) => {
              setShowMedication(checked);
              if (!checked) {
                form.setValue("medicationType", undefined);
                form.setValue("medicationDosage", undefined);
              }
            }}
          />
          <label
            htmlFor="medication-switch"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Record medication
          </label>
        </div>

        <div
          className={`transform transition-all duration-200 ease-in-out space-y-8 ${
            showMedication ? "opacity-100 max-h-96" : "opacity-0 max-h-0 overflow-hidden"
          }`}
        >
          <FormField
            control={form.control}
            name="medicationType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Medication Type</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
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
              <FormItem>
                <FormLabel>Medication Dosage (mg)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="1"
                    {...field}
                    onChange={(e) =>
                      field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit">Save Entry</Button>
      </form>
    </Form>
  );
}

export default EntryForm;
