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
import { DatetimePicker } from "@/components/ui/date-time-picker";
import { Switch } from "@/components/ui/switch";
import { useMemo } from "react";
import medications from "@/features/fever-diary/utils/medications";

export type EntryFormValues = z.infer<typeof entrySchema>;

export type EntryFormProps = {
  defaultValues?: Partial<EntryFormValues>;
  onSubmit: (values: EntryFormValues) => Promise<void>;
};

const mergeDefaults = (overrides: Partial<EntryFormValues> = {}): EntryFormValues => ({
  date: new Date(),
  personId: "",
  ...overrides,
});

function EntryForm({ defaultValues, onSubmit }: EntryFormProps) {
  const defaults = useMemo(() => mergeDefaults(defaultValues), [defaultValues]);

  const form = useForm<EntryFormValues>({
    resolver: zodResolver(entrySchema),
    defaultValues: defaults,
  });

  const showTemperature = form.watch("showTemperature");
  const showMedication = form.watch("medication.show");

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
              <FormItem className="flex flex-col items-start">
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <DatetimePicker
                    value={field.value}
                    format={[
                      ["days", "months", "years"],
                      ["hours", "minutes"],
                    ]}
                    dtOptions={{ hour12: false }}
                    onChange={handleDateTimeChange}
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

        <div>
          <FormField
            control={form.control}
            name="showTemperature"
            render={({ field }) => {
              return (
                <FormItem className="flex items-center space-x-2 space-y-0">
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormLabel>Record temperature</FormLabel>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <div
            className={`transform transition-all duration-200 ease-in-out ${
              showTemperature ? "opacity-100 max-h-24 pt-4" : "opacity-0 max-h-0 overflow-hidden"
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
        </div>

        <div>
          <FormField
            control={form.control}
            name="medication.show"
            defaultValue={defaults.medication?.show}
            render={({ field }) => {
              return (
                <FormItem className="flex items-center space-x-2 space-y-0">
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormLabel>Record medication</FormLabel>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <div
            className={`transform transition-all duration-200 ease-in-out space-y-8 ${
              showMedication ? "opacity-100 max-h-96 pt-6" : "opacity-0 max-h-0 overflow-hidden"
            }`}
          >
            <FormField
              control={form.control}
              name="medication.value.type"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Medication Type</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={(v) => {
                        // @ts-expect-error, we are intentionally clearing the strength, while according to the schema it is required
                        form.setValue("medication.value.form.strength", "");
                        // @ts-expect-error, we are intentionally clearing the form.type, while according to the schema it is required
                        form.setValue("medication.value.form.type", "");
                        // @ts-expect-error, we are intentionally clearing the form.dose, while according to the schema it is required
                        form.setValue("medication.value.form.dose", "");

                        field.onChange(v);
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select medication type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(medications).map(([type, { label }]) => (
                          <SelectItem key={type} value={type}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="medication.value.form.type"
              render={({ field }) => {
                const medType = form.watch("medication.value.type");
                const medForms = medType ? medications[medType].forms : [];

                return (
                  <FormItem>
                    <FormLabel>Medication Form</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={(v) => {
                        // @ts-expect-error, we are intentionally clearing the strength, while according to the schema it is required
                        form.setValue("medication.value.form.strength", "");
                        // @ts-expect-error, we are intentionally clearing the form.dose, while according to the schema it is required
                        form.setValue("medication.value.form.dose", "");

                        field.onChange(v);
                      }}
                      defaultValue={field.value}
                      disabled={!medType}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select medication form" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {medForms.map(({ form, label }) => (
                          <SelectItem key={form} value={form}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="medication.value.form.strength"
              render={({ field }) => {
                const medType = form.watch("medication.value.type");
                const medFormType = form.watch("medication.value.form.type");

                const disabled = !medType || !medFormType;
                const medFormVariants =
                  !disabled && medications[medType].forms.find((f) => f.form === medFormType);

                return (
                  <FormItem>
                    <FormLabel>Medication Strength</FormLabel>
                    <Select
                      defaultValue={field.value && String(field.value)}
                      value={field.value && String(field.value)}
                      onValueChange={field.onChange}
                      disabled={disabled}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select medication strength" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {medFormVariants &&
                          medFormVariants.variants.map(({ strength, label }) => (
                            <SelectItem key={strength} value={String(strength)}>
                              {label}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="medication.value.form.dose"
              render={({ field }) => {
                const medType = form.getValues("medication.value.type");
                const medFormType = form.watch("medication.value.form.type");
                const medFormStrength = form.watch("medication.value.form.strength");

                const disabled = !showMedication || !medType || !medFormType || !medFormStrength;

                const medForm =
                  !disabled && medications[medType].forms.find((f) => f.form === medFormType);
                const doseUnit = medForm && medForm.doseUnit ? `(${medForm.doseUnit})` : "";

                return (
                  <FormItem>
                    <FormLabel disabled={disabled}>Medication Dosage {doseUnit}</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="1"
                        disabled={disabled}
                        {...field}
                        onChange={(e) =>
                          field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
        </div>

        <Button type="submit">Save Entry</Button>
      </form>
    </Form>
  );
}

export default EntryForm;
