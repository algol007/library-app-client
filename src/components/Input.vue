<template>
  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label class="label">{{name}}</label>
    </div>
    <div class="field-body">
      <div class="field">
        <div class="control">
          <input class="input" type="text" :placeholder="name" :value="value">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Input',
  props: [
    'name',
    'value',
  ],
};
</script>

<style></style>
