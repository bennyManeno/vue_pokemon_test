<template>
        <nav aria-label="">
            <ul class="pagination pagination-lg justify-content-center">
                <li v-if="pagination.prev_url === null" class="disabled page-item"><a class="page-link" href="#">Previous</a></li>
                <li v-else :class="'page-item font-weight-bold'"     @click="$emit('get_pagination_direction', pagination.prev_url, 'prev')"><a class="page-link" href="#">Previous</a></li>
                
                <li v-for="(page, index) in pagination.pagination_array" :key="index" :class="pagination.page_number === page ? 'page-item active' : 'page-item'"    @click="$emit('get_pagination_number',page)" ><a class="page-link" href="#" >{{ page }}</a></li>
                
                <li v-if="pagination.next_url === null" class="disabled page-item" ><a class="page-link" href="#">Next</a></li>
                <li v-else class="page-item font-weight-bold"     @click="$emit('get_pagination_direction', pagination.next_url, 'next')" ><a class="page-link" href="#">Next</a></li>
            </ul>
        </nav>
</template>
<script>

export default {

    props : [

        'pagination'
    ]
}

</script>
