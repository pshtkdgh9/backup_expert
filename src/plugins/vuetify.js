// src/plugins/vuetify.js

// src/plugins/vuetify.js

// import '@fortawesome/fontawesome-free/css/all.css' // Ensure you are using css-loader
import Vue from 'vue'
import 'vuetify/dist/vuetify.min.css'
import Vuetify from 'vuetify'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(Vuetify)

export default new Vuetify({
	icons: {
		iconfont: 'mdiSvg',
		icons: { iconfont: 'md', }, // 이것 추가
	},
})
