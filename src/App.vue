<template>
  <div id="app">
    <a class="bg-dark text-light p-2 mb-2 rounded font-weight-bold" href="#Bottom" style="float:right"> Bottom </a>
    <div id="top" style="background:#FFCC00">
      <img alt="Vue logo" src="./assets/pokemon-logo.png" width="500px">
    </div>
    <dataTableMenu  @navigation_change="navigation_change"></dataTableMenu>
    <dataTable :columns="columns">

                <tbody>
                  <tr v-for="(pokemon, index) in pokemons" :key="index" class="">
                    <!-- <div class="d-none">{{ getPokemonDetail(pokemon.url) }}</div> -->
                    <td class="p-0"> {{ pokemon.id      }}</td>
                    <td class="p-0"> {{ pokemon.name    }}</td>
                    <td class="p-0"> {{ pokemon.height }}</td>
                    <td class="p-0"> {{ pokemon.weight }}</td>
                    <td class="p-0"> 
                        <img :src="pokemon.image" width='50px' > 
                    </td>
                  </tr>
                </tbody>

    </dataTable>

    <div class="p-5 pt-0" style="background:#FFCC00">
      <dataTableLoadMore v-if="show_loadmore === true" :loadMore_max="loadMore_max" @get_load_more="get_load_more"></dataTableLoadMore>
      <dataTablePagination v-else :pagination="pagination" @get_pagination_direction="get_pagination_direction" @get_pagination_number="get_pagination_number"></dataTablePagination>
    </div>

    <a id="Bottom" class="bg-dark text-light p-2 mb-2 rounded font-weight-bold" href="#top" style="float:right"> Top </a>

  </div>
</template>

<script>

const axios = require('axios').default;

import DataTable            from './components/Table.vue';
import DataTableMenu        from './components/TableMenu.vue';
import DataTablePagination  from './components/TablePagination.vue';
import DataTableLoadMore    from './components/TableLoadMore.vue';
export default {

    name: 'App',
    components: {

      dataTable : DataTable,
      dataTablePagination : DataTablePagination,
      dataTableLoadMore : DataTableLoadMore,
      dataTableMenu : DataTableMenu

    },
    mounted(){
        this.getPokemons(),
        this.pagination_build()
        
    },

    data(){

      let columns = [
            {width: '20%',  label: 'Id'    },
            {width: '20%',  label: 'Name'  },
            {width: '20%',  label: 'Height'},
            {width: '20%',  label: 'Weight'},
            {width: '20%',  label: 'Image' },
      ];

      return {
        limit: 30,
        offset: 0,
        total_items : 150,
        data_return: [],    
        pokemons_list: [],
        pokemons: [],
        url: 'https://pokeapi.co/api/v2/pokemon',
        loadMore_number : 0,
        loadMore_max : false,
        show_pagination : true,
        show_loadmore : false,
        columns : columns, 
        pagination : {
          page_number : 1,
          pagination_array : [],
          pagination_limit : 30,
          next_url: '',
          prev_url: '',
          next_bool: false,
          prev_bool: false,
        }
        
      }
    },
    methods : {

        /* ---------------------- get the list of all pokemons ---------------------- */
        getPokemons(url = this.url+'?limit='+this.limit+'&offset='+this.offset){ 
       
            axios.get(url)
            .then(response => {


                this.data_return              = response;
                if(this.pagination.page_number >= (this.total_items / this.limit)) this.data_return.data.next = null ;

                this.pokemons_list  = this.data_return.data.results;
                this.pagination.next_url       = this.data_return.data.next;
                this.pagination.prev_url       = this.data_return.data.previous;
                this.pagination.next_bool      = false;
                this.pagination.prev_bool      = false;

                this.getPokemonDetail();

                if((this.loadMore_number + 15) == this.total_items) this.loadMore_max = true;
            });
        },

        /* ------------------------- get each pokemon detail ------------------------ */
        getPokemonDetail(){

            for (const pokemon of this.pokemons_list) {
                
                axios.get(pokemon.url)
                .then(response => {
    
                    let responseData = response.data;
                    this.pokemons.push({'id' : responseData.id,'name' : responseData.name, 'height' : responseData.height, 'weight' : responseData.weight, 'image' : responseData.sprites.back_default});
                    this.pokemons.sort(function (a,b) {
                        return a.id - b.id;
                    });
                });
            }
        },

        /* --------------------- building of the html pagination array -------------------- */
        pagination_build(){

            var number_of_pages = this.total_items / this.pagination.pagination_limit ;
            var i = 0;
            while( number_of_pages > i){
                i++
                this.pagination.pagination_array.push(i);
            }
        },

        /* ------------------------- the load more function ------------------------- */
        get_load_more(){

            if(this.limit == 30){
                this.offset = 30;
                this.limit = 15;
            }else{
                this.offset = (this.offset + 15);
            }

            this.loadMore_number = this.offset;

            console.log(this.offset);
            this.getPokemons();
        },
        
        /* ----------------- the pagination by page number function ----------------- */
        get_pagination_number(page_number){
            
            this.offset = (this.limit * page_number) - 30;
            this.pagination.page_number = page_number;
            this.pokemons = [];
            this.getPokemons();

        },
        /* ------------------ the pagination by direction function ------------------ */
        get_pagination_direction(url, direction){

          if(direction == 'next'){
            this.pagination.next_bool = true;
          }else if(direction == 'prev'){
            this.pagination.prev_bool = true;
          }

          if(this.pagination.next_bool === true){
              if(this.pagination.page_number < (this.total_items / this.limit)) this.pagination.page_number++;
          }else if(this.pagination.prev_bool === true){
              if(this.pagination.page_number > 1) this.pagination.page_number--;
          }
          this.pokemons = [];
          this.getPokemons(url);

        },

        /* ---------------------- the navigation types function --------------------- */
        navigation_change(event) {

            this.limit = 30;
            this.offset = 0;
            this.pokemons = [];
            this.loadMore_number = 0;
            this.loadMore_max = false;
            this.pagination.page_number  = 1,
            this.pagination.next_bool = false,
            this.pagination.prev_bool = false,
        
            this.getPokemons();
            if(event.target.value == 1){
                this.show_pagination = true ;
                this.show_loadmore = false;
            }
            if(event.target.value == 2){
                this.show_pagination = false ;
                this.show_loadmore = true;
            }
        }
    }
}
</script>

<style>
@import'~bootstrap/dist/css/bootstrap.css';

html{

  background-color: #FFCC00;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}

td{

  vertical-align: middle!important;;
}

.page-item .page-link{

  color:#0B2A61
}

.page-item.active .page-link{

  background-color:#0B2A61;
}

</style>
