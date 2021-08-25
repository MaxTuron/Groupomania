<template>
  <form>
    <img src="../../../logo/icon-above-font.svg">
    <div class="form-example">
      <div class="form-example">
        <label for="lastName">Nom </label>
        <input type="text" name="lastName" id="lastName" required>
      </div>
      <label for="name">Prenom</label>
      <input type="text" name="name" id="name" required>
    </div>
    <div class="form-example">
      <label for="email">Email </label>
      <input type="text" name="email" id="email" required>
    </div>
    <div class="form-example">
      <label for="password">Password</label>
      <input type="email" name="password" id="password" required>
    </div>
    <div class="form-example">
      <input type="submit" value="Inscription">
    </div>
  </form>
</template>

<script>
export default {
  name: "SignupCompo"
}
</script>

<style>
img{
  width: 20%;
}
</style>