import { type Color } from '../colors'

/**
 * Base constraint for all option types.
 * Every option must have at minimum a value, label, and optional disabled state.
 *
 * @typeParam V - The type of the option's value (default: string)
 */
export interface BaseOption<V = string> {
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
export interface ExtendedOption<V = string> extends BaseOption<V> {
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
export type Option<V = string, T extends BaseOption<V> = ExtendedOption<V>> = T

/**
 * Generic OptionGroup for grouped options.
 *
 * @typeParam V - The type of the option's value (default: string)
 * @typeParam T - The full option type extending BaseOption<V> (default: ExtendedOption<V>)
 */
export interface OptionGroup<V = string, T extends BaseOption<V> = ExtendedOption<V>> {
  title?: string
  options: T[]
}

/**
 * Switcher-specific option with icon support.
 *
 * @typeParam V - The type of the option's value (default: string)
 */
export interface SwitcherOption<V = string> extends BaseOption<V> {
  icon?: string
}

/**
 * Type guard to check if options are grouped.
 *
 * @typeParam V - The type of the option's value
 * @typeParam T - The full option type extending BaseOption<V>
 */
export function areOptionsGrouped<V, T extends BaseOption<V>>(
  options: T[] | OptionGroup<V, T>[]
): options is OptionGroup<V, T>[] {
  return !!options.length && 'options' in options[0]
}

/**
 * Prefix used internally for group selection values in SelectableOptionGroup.
 * This is an internal mechanism and should not be used by consumers.
 */
export const GROUP_VALUE_PREFIX = '__group__'
