// Auto-generated icon types - do not edit manually
// Run `npm run generate:icon-types` to regenerate

export type SmIcon =
  | 'Ai'
  | 'Archive'
  | 'ArrowDown'
  | 'ArrowLeft'
  | 'ArrowUp'
  | 'Asset'
  | 'Buildings'
  | 'Check'
  | 'Close'
  | 'Component'
  | 'Dashboard'
  | 'Drag'
  | 'Drop'
  | 'Eye'
  | 'Filter'
  | 'Flag'
  | 'Floors'
  | 'Folder'
  | 'Google'
  | 'Group'
  | 'MenuChevronDown'
  | 'MenuChevronRight'
  | 'Name'
  | 'NoCloud'
  | 'Orders'
  | 'Organization'
  | 'Published'
  | 'Refresh'
  | 'Search'
  | 'Size'
  | 'Size2'
  | 'Space'
  | 'SpaceAndComponent'
  | 'Team'
  | 'User'
  | 'Warning'

export type MdIcon =
  | 'Ai'
  | 'Air'
  | 'ArrowLeft'
  | 'ArrowRight'
  | 'Asset'
  | 'AssetsGroup'
  | 'Bin'
  | 'Buildings'
  | 'Burger'
  | 'Camera'
  | 'Card'
  | 'Check'
  | 'ChevronDown'
  | 'ChevronLeft'
  | 'ChevronRight'
  | 'ChevronUp'
  | 'Close'
  | 'Cog'
  | 'Copy'
  | 'Dashboard'
  | 'Document'
  | 'Download'
  | 'Edit'
  | 'Elipse'
  | 'Expand'
  | 'Eye'
  | 'Filter'
  | 'Fit'
  | 'Floors'
  | 'Folder'
  | 'FolderOpen'
  | 'Hide'
  | 'Imperial'
  | 'Info'
  | 'InspectorClose'
  | 'InspectorOpen'
  | 'LConnect'
  | 'Location'
  | 'MenuChevronDown'
  | 'MenuChevronRight'
  | 'Metric'
  | 'Minimap'
  | 'More'
  | 'Move'
  | 'NoCloud'
  | 'NoEye'
  | 'NoSnap'
  | 'OpenPadlock'
  | 'Orders'
  | 'Organization'
  | 'Padlock'
  | 'Pause'
  | 'Play'
  | 'Proximity'
  | 'Refresh'
  | 'RotateLeft'
  | 'RotateRight'
  | 'Search'
  | 'Settings'
  | 'Size'
  | 'Snap'
  | 'SocialFacebook'
  | 'SocialLinkedin'
  | 'SocialTwitter'
  | 'Star'
  | 'TConnect'
  | 'Upload'
  | 'User'
  | 'Wifi'
  | 'ZoomIn'
  | 'ZoomOut'

export type LgIcon =
  | 'Area'
  | 'ArrowLeft'
  | 'Burger'
  | 'Distance'
  | 'History'
  | 'Info'
  | 'Insert'
  | 'InsertAssets'
  | 'Layers'
  | 'More'
  | 'Move'
  | 'Pencil'
  | 'PencilLocked'
  | 'Redo'
  | 'Search'
  | 'Undo'

export type OtherIcon =
  | 'Add'
  | 'CheckboxCheck'
  | 'CheckboxIndeterminate'
  | 'ChevronDown'
  | 'ChevronLeft'
  | 'ChevronRight'
  | 'ChevronUp'
  | 'Hide'
  | 'MenuChevronDown'
  | 'MenuChevronRight'
  | 'Padlock'
  | 'Warning'

export type IconSize = 'sm' | 'md' | 'lg' | 'other'

export type IconName<S extends IconSize> = S extends 'sm'
  ? SmIcon
  : S extends 'md'
    ? MdIcon
    : S extends 'lg'
      ? LgIcon
      : S extends 'other'
        ? OtherIcon
        : never

// Lowercase versions for camelCase support
export type SmIconLower = Lowercase<SmIcon>
export type MdIconLower = Lowercase<MdIcon>
export type LgIconLower = Lowercase<LgIcon>
export type OtherIconLower = Lowercase<OtherIcon>

export type IconNameLower<S extends IconSize> = S extends 'sm'
  ? SmIconLower
  : S extends 'md'
    ? MdIconLower
    : S extends 'lg'
      ? LgIconLower
      : S extends 'other'
        ? OtherIconLower
        : never

// Combined type that accepts both PascalCase and camelCase
export type IconNameAnyCase<S extends IconSize> = IconName<S> | IconNameLower<S>

// All valid icon names (any size) - for basic validation
export type AnyIcon = SmIcon | MdIcon | LgIcon | OtherIcon
export type AnyIconLower = SmIconLower | MdIconLower | LgIconLower | OtherIconLower
export type AnyIconName = AnyIcon | AnyIconLower
