<template>
    <div class="p-5" style="background:#FFCC00">
        <select class="browser-default custom-select custom-select-lg mt-3 ont-weight-bold" @change="$emit('navigation_change',$event)">
            <option selected>Choose Menu Type</option>
            <option value="1">pagination</option>
            <option value="2">load more</option>
        </select>
    </div>
</template>
