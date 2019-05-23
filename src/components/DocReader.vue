<template>
    <div>
        <nuxeo-connection url="http://localhost:8080/nuxeo"></nuxeo-connection>

        <nuxeo-document-suggestion
                placeholder="search a document"
                @selected-item-changed="selectedDoc">
        </nuxeo-document-suggestion>

        <nuxeo-document auto
                        v-bind:doc-path="path"
                        @response-changed="doc = $event.detail.value"></nuxeo-document>


        <nuxeo-page-provider auto
                             ref="pp"
                             provider="advanced_document_content"
                             enrichers="thumbnail"
                             v-bind:params.prop="params"
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

            <div v-if="isFolderish">
                <div class="flex">
                    <h3>Upload files:</h3>
                    <nuxeo-file @value-changed="importFile"></nuxeo-file>
                </div>
                <h3>Children:</h3>
                <nuxeo-documents-table :documents.prop="children"></nuxeo-documents-table>
            </div>
        </div>
    </div>
</template>

<script>

    // define legacy router for elements using `nuxeo-router-behavior`
    import {RoutingBehavior} from '@nuxeo/nuxeo-ui-elements/nuxeo-routing-behavior';

    RoutingBehavior.__router = {
        browse() {
            return '#';
        },
    };


    import '@nuxeo/nuxeo-elements/nuxeo-connection';
    import '@nuxeo/nuxeo-elements/nuxeo-document';
    import '@nuxeo/nuxeo-elements/nuxeo-page-provider';
    import '@nuxeo/nuxeo-ui-elements/widgets/nuxeo-file';
    import '@nuxeo/nuxeo-ui-elements/widgets/nuxeo-document-suggestion';
    import './nuxeo-documents-table';


    export default {
        name: 'DocReader',

        data: () => ({
            path: undefined,
            doc: undefined,
            children: []
        }),

        computed: {
            contributors() {
                return this.doc && this.doc.properties['dc:contributors'];
            },
            params() {
                return this.doc ? {ecm_parentId: this.doc.uid} : {};
            },
            isFolderish() {
                return this.doc && this.doc.facets.indexOf('Folderish') != -1;
            }
        },

        methods: {
            importFile(event) {
                const context = {currentDocument: this.path};
                event.target
                    .batchExecute('FileManager.Import', {context}, {nx_es_sync: 'true'})
                    .then(() => event.target.value = undefined)
                    .then(() => this.$refs.pp.fetch());
            },

            selectedDoc(e) {
                if (e.detail.value) {
                    this.path = e.detail.value.path;
                } else {
                    this.path = this.doc = undefined;
                }
            }
        }
    }
</script>
