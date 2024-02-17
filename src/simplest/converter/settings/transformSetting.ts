type Options = Record<string, unknown>;
type Setting<EntryName extends string> = Record<EntryName, Options>;

export type OptionsTransformer<
  EntryName extends string = string,
  OldOptions extends Options = Options,
  NewOptions extends Options = Options
> = (entryKey: EntryName, options: OldOptions) => NewOptions;

export const transformSetting =
  <
    EntryName extends string,
    OldOptions extends Options,
    NewOptions extends Options
  >(
    setting: Setting<EntryName>
  ) =>
  (optionFormatter: OptionsTransformer<EntryName, OldOptions, NewOptions>) => {
    const mapTransformedOptions = ([propName, options]: [
      EntryName,
      OldOptions
    ]) =>
      [propName, optionFormatter(propName, options)] as [EntryName, NewOptions];

    const initialEntries = Object.entries(setting) as [EntryName, OldOptions][];
    const optionTransformed = initialEntries.map(mapTransformedOptions);
    const newOptionEntries = optionTransformed.reduce(
      (acc, [propName, newOptions]) => {
        return {
          ...acc,
          [propName]: newOptions,
        };
      },
      {} as Record<EntryName, NewOptions>
    );

    return newOptionEntries;
  };
