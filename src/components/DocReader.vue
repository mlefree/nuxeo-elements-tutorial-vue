<template>
  <div>
    <nuxeo-connection url="/nuxeo"></nuxeo-connection>
    <nuxeo-document id="doc" auto
      :doc-path="path"
      @response-changed="doc = $event.detail.value"></nuxeo-document>
    <nuxeo-page-provider auto
                     provider="advanced_document_content"
                     :params="params"
                     @current-page-changed="children = $event.detail.value">
    </nuxeo-page-provider>

    <div v-if="doc">
      <h2>Title: {{doc.title}}</h2>
      <p>ID: {{doc.uid}}</p>
      <p>Repository: {{doc.repository}}</p>
      <p>State: {{doc.state}}</p>
      <h3>Contributors:</h3>
      <ul>
        <li v-for="contributor in contributors" :key="contributor">{{contributor}}</li>
      </ul>
      <h3>Children:</h3>
      <ul>
        <li v-for="child in children" :key="child.uid">{{child.title}}</li>
      </ul>
    </div>    
  </div>
</template>

<script>
import '@nuxeo/nuxeo-elements/nuxeo-connection'
import '@nuxeo/nuxeo-elements/nuxeo-document'
import '@nuxeo/nuxeo-elements/nuxeo-page-provider'

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
  }
}
</script>
