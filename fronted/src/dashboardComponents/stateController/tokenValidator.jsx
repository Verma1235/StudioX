async function tokenValidator() {
  const token = localStorage.getItem("token");

  // console.log("TOKEN:", token);

  if (!token) {
    // console.log("NO TOKEN");
    return false;
  }

  try {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_DATA_URL}/api/token`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    // console.log("STATUS:", res.status);

    const data = await res.json();

    // console.log("DATA:", data);

    return data.success === true;
  } catch (err) {
    console.log("ERROR:", err);
    return 2;
  }
}

async function checktoken(setrole, toggleProcessingWindow) {
  // toggleProcessingWindow();
  setrole(7);
  const valid = await tokenValidator();

  // console.log("VALID:", valid);

  if (valid) {
    setrole(1);
  
  } else {
    setrole(6);
    if (valid == 2) {
      setrole(7);
    }
  
  }
}

export { tokenValidator, checktoken };
