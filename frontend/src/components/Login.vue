<template>
  <form>
    <h1>{{msg}}</h1>
    <div class="form-example">
      <label for="email">Email </label>
      <input type="text" name="email" id="email" required>
    </div>
    <div class="form-example">
      <label for="password">Password</label>
      <input type="email" name="password" id="password" required>
    </div>
    <div class="form-example">
      <input type="submit" value="Connexion">
    </div>
  </form>
</template>

<script>
export default {
  name: "Login",
  props: {
    msg: String
  },
}
</script>

<style>

</style>