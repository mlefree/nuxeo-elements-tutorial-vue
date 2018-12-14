<template>
  <nuxeo-layout ref="layout"
                :href="href"
                :model.prop="model">
  </nuxeo-layout>
</template>

<script>
import '@nuxeo/nuxeo-ui-elements/nuxeo-layout'

export default {
  name: 'DocLayout',

  props: {
    layout: {
      type: String,
      default: 'view'
    },
    document: {
      type: Object
    },
  },

  computed: {
    href() {
      if (this.document) {
        const doctype = this.document.type.toLowerCase();
        const name = `nuxeo-${doctype}-${this.layout}-layout`;
        return `/nuxeo/ui/document/${doctype}/${name}.html`;
      }
    },
    model() {
      return {document: this.document};
    }
  }
}
</script>
