<script lang="ts">
  import RandomSymbol from "./app/RandomSymbol.ts";

  export let name: string;

  const text = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe quia facere eum expedita repellendus impedit? Praesentium numquam iste architecto reiciendis ullam modi, debitis eligendi enim voluptatem eum, similique placeat autem!" 
</script>

<main>
	<h1>
    Hello {name}!
  </h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
  <button on:click={() => console.log(Array.from(RandomSymbol.randFloatList(10)))} />
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>