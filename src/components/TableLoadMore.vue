<template>
    <div class="row justify-content-center">
        <button v-if="loadMore_max === false" :class="'col-3 p-3 font-weight-bold btn text-light'" style="background-color:#0B2A61" @click="$emit('get_load_more')"> load more...  </button>
        <button v-else class='disabled btn btn-muted col-3 p-3 font-weight-bold'> load more Max </button>
    </div>
</template>

<script>

export default {

    props : ['loadMore_max']
}
</script>
