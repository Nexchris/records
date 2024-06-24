// En recherche.

if (vinyleDataList.length === 0) {
    return <Loader>
      <Loadertext>Connecting to the network,</Loadertext>
      <Loadertext> searching for vinyl records...</Loadertext>
      <br />
      <Loaderitem>
      <div class="spinner-grow text-primary" role="status">
  <span class="sr-only">Loading...</span>
</div>
<div class="spinner-grow text-primary" role="status">
  <span class="sr-only">Loading...</span>
</div>
<div class="spinner-grow text-primary" role="status">
  <span class="sr-only">Loading...</span>
</div>
<div class="spinner-grow text-primary" role="status">
  <span class="sr-only">Loading...</span>
</div>
<div class="spinner-grow text-primary" role="status">
  <span class="sr-only">Loading...</span>
</div>
</Loaderitem>
    </Loader>
  }