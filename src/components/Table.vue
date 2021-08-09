<template>

    <table class="table  align-middle table-warning table-hover table-striped m-0 rounded w-100">
        <thead class="text-light" style="background:#0B2A61">
            <tr>
                <th v-for="column in columns" :key="column.name" :style="'width:'+column.width" scope="col"> {{ column.label }}</th>
            </tr>
        </thead>
        <slot></slot>
    </table>

</template> 

<script>

    export default{

        props : [

            'columns'
        ]
    }
</script>
