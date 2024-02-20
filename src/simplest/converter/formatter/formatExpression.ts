import {ESCAPED_MARKERS, MARKERS} from '../settings/config';

const {SIMPLE_AREA} = MARKERS;
const {ESCAPED_IGNORE_AREA, ESCAPED_SIMPLE_AREA} = ESCAPED_MARKERS;

type ReplaceResult = {
  placeholderised: string;
  mappings: Record<string, string>;
};

export const formatExpression = (simple: string): string => {
  const formatOperators = (target: string): string => {
    return target.replace(/([+\-*/><=])/g, ' $1 ').replace(/\s{2,}/g, ' ');
  };

  const protectArea =
    (target: string) =>
    (regex: RegExp) =>
    (placeholderPrefix: string) =>
    (
      wrapWith: (content: string) => string = (content) => content
    ): ReplaceResult => {
      const mappings: ReplaceResult['mappings'] = {};
      const placeholderised = target.replace(regex, (_, matchContent) => {
        const placeholder = `%${placeholderPrefix}_${
          Object.keys(mappings).length
        }%`;
        mappings[placeholder] = wrapWith(matchContent);
        return placeholder;
      });
      return {placeholderised, mappings};
    };

  const restorePlaceholders =
    (target: string) =>
    (mappings: ReplaceResult['mappings']): string => {
      return target.replace(
        /%[^%]+_\d+%/g,
        (placeholder) => mappings[placeholder]
      );
    };

  if (simple.startsWith('var')) {
    return simple;
  }

  const cssVarRegex = /var\((.*?)\)/g;
  const ignoreAreaRegex = new RegExp(
    `${ESCAPED_IGNORE_AREA.START}(.*?)${ESCAPED_IGNORE_AREA.END}`,
    'g'
  );
  const simpleAreaRegex = new RegExp(
    `${ESCAPED_SIMPLE_AREA.START}(.*?)${ESCAPED_SIMPLE_AREA.END}`,
    'g'
  );

  const protectedCSSVars = protectArea(simple)(cssVarRegex)('CSS_VAR')(
    (content) => `var(${content})`
  );
  const protectedIgnoreArea = protectArea(protectedCSSVars.placeholderised)(
    ignoreAreaRegex
  )('IGNORE_AREA')();
  const protectedSimpleArea = protectArea(protectedIgnoreArea.placeholderised)(
    simpleAreaRegex
  )('SIMPLE_AREA')((content) => SIMPLE_AREA.START + content + SIMPLE_AREA.END);

  const mappings = {
    ...protectedCSSVars.mappings,
    ...protectedIgnoreArea.mappings,
    ...protectedSimpleArea.mappings
  };

  const formattedOperators = formatOperators(
    protectedSimpleArea.placeholderised
  );

  return restorePlaceholders(formattedOperators)(mappings);
};
