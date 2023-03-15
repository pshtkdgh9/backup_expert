<template lang="html">
  <v-container class="col-6">
    <v-row align="center" justify="center" >
      <v-col cols='12'>
        <v-app>
    <v-card>
      <v-card-title>
        Nutrition
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="desserts"
        :search="search"
      ></v-data-table>
    </v-card>
  </v-app>
      </v-col>
    </v-row>
  </v-container >
</template>


<script>


import XLSX from 'xlsx'

export default {
  data () {
      return {
        search: '',
        headers: [
          {
            align: 'start',
            key: 'name',
            sortable: false,
            title: 'Dessert (100g serving)',
          },
          { key: 'calories', title: 'Calories' },
          { key: 'fat', title: 'Fat (g)' },
          { key: 'carbs', title: 'Carbs (g)' },
          { key: 'protein', title: 'Protein (g)' },
          { key: 'iron', title: 'Iron (%)' },
        ],
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: 1,
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: 1,
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: 7,
          },
          {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: 8,
          },
          {
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            iron: 16,
          },
          {
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            iron: 0,
          },
          {
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            iron: 2,
          },
          {
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            iron: 45,
          },
          {
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            iron: 22,
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: 6,
          },
        ],
      }
    },
    created(){
      this.$store.commit("setIsMini", false);
    },
    methods: {
      importFile(bType){

        if( this.file[bType]){
          let self = this;
          let reader = new FileReader();
          reader.onload = function() {
            let data  = reader.result;
            let wb = XLSX.read(data, {type : 'binary'});

            wb.SheetNames.forEach((sn) => {
              let rows  = XLSX.utils.sheet_to_json(wb.Sheets[sn]);
              // console.log('ROWS', rows);
              let flag = true;
              if(bType == 'sci'){
                rows.some((row, i) => {
                if(row['Full Journal Title'] == undefined || row['5-Year Impact Factor'] == undefined)
                {
                  console.log('error line : ', i);
                  flag = false;
                }
              });
              }
              else{
                rows.some((row, i) => {
                  if(row['발행기관'] == undefined || row['(자기인용제외) KCI IF (5년)'] == undefined)
                  {
                    console.log('error line : ', i);
                    flag = false;
                    return true;
                  }
                });
              }
              if(flag){
                self.$store.dispatch('uploadIFFile', { rows, type : bType });
              }else{
                self.$store.commit('showSnack', 'File Type error');
              }
            });
          };
          reader.onerror = function(ex) {
            self.$store.commit('showSnack', ex);
          };
          reader.readAsBinaryString(this.file[bType]);
        }
      },
    }
  }

  </script>
