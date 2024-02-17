type Options = Record<string, unknown>;
type Setting<EntryName extends string> = Record<EntryName, Options>;

export type OptionsTransformer<
  EntryName extends string,
  OldOptions extends Options,
  NewOptions extends Options
> = (entryKey: EntryName, options: OldOptions) => NewOptions;

export const transformSetting =
  <
    EntryName extends string,
    OldOptions extends Options,
    NewOptions extends Options
  >(
    setting: Setting<EntryName>
  ) =>
  (
    optionFormatter: OptionsTransformer<EntryName, OldOptions, NewOptions>
  ): Setting<EntryName> => {
    const entries = Object.entries(setting) as [EntryName, OldOptions][];

    const transformedEntries = entries.map(([entryName, oldOptions]) => {
      const newOptions = optionFormatter(entryName, oldOptions);
      return [entryName, newOptions] as [EntryName, NewOptions];
    });

    const newSetting = transformedEntries.reduce(
      (acc, [entryName, newOptions]) => {
        acc[entryName] = newOptions;
        return acc;
      },
      {} as Setting<EntryName>
    );

    return newSetting;
  };
