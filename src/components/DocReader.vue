<template>
  <div>
    <nuxeo-connection url="/nuxeo"></nuxeo-connection>
    <nuxeo-document auto
      :doc-path="path"
      @response-changed="doc = $event.detail.value"></nuxeo-document>
    <nuxeo-page-provider auto
                    ref="pp"
                    provider="advanced_document_content"
                    enrichers="thumbnail"
                    :params.prop="params"
                    @current-page-changed="children = $event.detail.value">
    </nuxeo-page-provider>

    <div v-if="doc">
      <h2>Title: {{doc.title}}</h2>
      <p>ID: {{doc.uid}}</p>
      <p>Repository: {{doc.repository}}</p>
      <p>State: {{doc.state}}</p>
      <div class="flex">
        <h3>Upload files:</h3>
        <nuxeo-file @value-changed="importFile"></nuxeo-file>
      </div>
      <h3>Contributors:</h3>
      <ul>
        <li v-for="contributor in contributors" :key="contributor">{{contributor}}</li>
      </ul>
      <h3>Children:</h3>
      <nuxeo-documents-table :documents.prop="children"></nuxeo-documents-table>
    </div>
  </div>
</template>

<script>
import '@nuxeo/nuxeo-elements/nuxeo-connection'
import '@nuxeo/nuxeo-elements/nuxeo-document'
import '@nuxeo/nuxeo-elements/nuxeo-page-provider'
import '@nuxeo/nuxeo-ui-elements/widgets/nuxeo-file'
import './nuxeo-documents-table'

export default {
  name: 'DocReader',
  props: {
    path: {
      type: String,
      default: '/default-domain'
    }
  },
  data: () => ({
    doc: undefined,
    children: []
  }),
  computed: {
    contributors() {
      return this.doc.properties['dc:contributors'];
    },
    params() {
      return this.doc ? { ecm_parentId: this.doc.uid } : {};
    }
  },
  methods: {
    importFile(event) {
      const context = {currentDocument: this.path};
      event.target
        .batchExecute('FileManager.Import', { context }, { nx_es_sync: 'true' })
        .then(() => event.target.value = undefined)
        .then(() => this.$refs.pp.fetch());
    }
  }
}
</script>
