import { Component } from 'vue'
const logosModules: Record<string, { default: Component }> = import.meta.glob('./**/*.svg', {
  eager: true
})

const logosMap: Record<string, Component> = {}

for (const path in logosModules) {
  const name = path.slice(2, -4)
  logosMap[name] = logosModules[path].default
}

export default logosMap
