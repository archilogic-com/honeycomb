import { type Color } from '../colors'
import { type SmIcon, type SmIconId } from '../components/icons/types'

/**
 * Valid value types that can be used as option values.
 * Constrained to types compatible with HeadlessUI components.
 */
export type OptionValue = string | number | boolean | Record<string, unknown> | null

/**
 * Base constraint for all option types.
 * Every option must have at minimum a value, label, and optional disabled state.
 *
 * @typeParam V - The type of the option's value (default: string)
 */
export interface BaseOption<V extends OptionValue = string> {
  value: V
  label: string
  disabled?: boolean
}

/**
 * Extended option with color support.
 * This is the default option type for backwards compatibility with existing code.
 *
 * @typeParam V - The type of the option's value (default: string)
 */
export interface ExtendedOption<V extends OptionValue = string> extends BaseOption<V> {
  color?: Color
}

/**
 * Generic Option type alias.
 * Defaults to ExtendedOption<string> for backwards compatibility.
 *
 * @typeParam V - The type of the option's value (default: string)
 * @typeParam T - The full option type extending BaseOption<V> (default: ExtendedOption<V>)
 *
 * @example
 * // Default usage (backwards compatible)
 * const options: Option[] = [{ value: 'a', label: 'Option A' }]
 *
 * @example
 * // With custom value type
 * const numericOptions: Option<number>[] = [{ value: 1, label: 'One' }]
 *
 * @example
 * // With custom option type
 * interface MyOption extends BaseOption<number> {
 *   metadata: { priority: number }
 * }
 * const customOptions: Option<number, MyOption>[] = [
 *   { value: 1, label: 'One', metadata: { priority: 1 } }
 * ]
 */
export type Option<V extends OptionValue = string, T extends BaseOption<V> = ExtendedOption<V>> = T

/**
 * Generic OptionGroup for grouped options.
 *
 * @typeParam V - The type of the option's value (default: string)
 * @typeParam T - The full option type extending BaseOption<V> (default: ExtendedOption<V>)
 */
export interface OptionGroup<
  V extends OptionValue = string,
  T extends BaseOption<V> = ExtendedOption<V>
> {
  title?: string
  options: T[]
}

/**
 * Switcher-specific option with icon support.
 * Icons can be specified as:
 * - SmIconId format: "search-sm", "check-sm" (recommended, type-safe)
 * - SmIcon format: "Search", "Check" (legacy, still supported)
 *
 * @typeParam V - The type of the option's value (default: string)
 */
export interface SwitcherOption<V extends OptionValue = string> extends BaseOption<V> {
  icon?: SmIconId | SmIcon | Uncapitalize<SmIcon>
}

/**
 * Type guard to check if options array contains grouped options.
 *
 * @typeParam V - The type of the option's value
 * @typeParam T - The full option type extending BaseOption<V>
 */
export function areOptionsGrouped<V extends OptionValue, T extends BaseOption<V>>(
  options: T[] | OptionGroup<V, T>[]
): options is OptionGroup<V, T>[] {
  return !!options.length && 'options' in options[0]
}

/**
 * Type guard to check if a single item is an OptionGroup (vs a flat option).
 * Useful for narrowing types when iterating over mixed option arrays.
 *
 * @example
 * filteredOptions.map(item => {
 *   if (isOptionGroup(item)) {
 *     // item is OptionGroup - access item.options, item.title
 *   } else {
 *     // item is T - access item.value, item.label
 *   }
 * })
 */
export function isOptionGroup<V extends OptionValue, T extends BaseOption<V>>(
  item: T | OptionGroup<V, T>
): item is OptionGroup<V, T> {
  return 'options' in item
}

/**
 * Prefix used internally for group selection values in SelectableOptionGroup.
 * This is an internal mechanism and should not be used by consumers.
 */
export const GROUP_VALUE_PREFIX = '__group__'
