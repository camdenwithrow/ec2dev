auth0
  .createAuth0Client({
    domain: "dev-m4j5n7wv.us.auth0.com",
    clientId: "S1gcrQy2DfhJrEjuLcsVgOONOnKIYFr2",
    authorizationParams: {
      redirect_uri: window.location.origin,
    },
  })
  .then(async (auth0Client) => {
    // Assumes a button with id "login" in the DOM
    const loginButton = document.getElementById("login");

    loginButton.addEventListener("click", (e) => {
      e.preventDefault();
      auth0Client.loginWithRedirect();
    });

    if (
      location.search.includes("state=") &&
      (location.search.includes("code=") || location.search.includes("error="))
    ) {
      await auth0Client.handleRedirectCallback();
      window.history.replaceState({}, document.title, "/");
    }

    // Assumes a button with id "logout" in the DOM
    const logoutButton = document.getElementById("logout");

    logoutButton.addEventListener("click", (e) => {
      e.preventDefault();
      auth0Client.logout();
    });

    const isAuthenticated = await auth0Client.isAuthenticated();
    const userProfile = await auth0Client.getUser();

    // Assumes an element with id "profile" in the DOM
    const profileElement = document.getElementById("profile");

    if (isAuthenticated) {
      profileElement.style.display = "block";
      profileElement.innerHTML = `
            <img src="${userProfile.picture}" />
          `;
      loginButton.classList.remove("visible");
      loginButton.classList.add("invisible");
      logoutButton.classList.add("visible");
    } else {
      profileElement.style.display = "none";

      logoutButton.classList.remove("visible");
      logoutButton.classList.add("invisible");
      loginButton.classList.add("visible");
    }
  });
