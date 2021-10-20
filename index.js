import fetch from "node-fetch";
import colors from "colors";

const getPracticas = async (
  ENDPOINT = "https://www.getonbrd.com/api/v0/categories/programming/jobs?page=",
  N = 10
) => {
  let data = await Promise.all(
    [...Array(N).keys()].map((x) => {
      return fetch(ENDPOINT + ++x).then((res) => res.json());
    })
  );
  data = data.reduce((prev, x) => [...prev, ...x.data], []);
  const practicas = data.filter((job) => job.attributes.modality.data.id == 4);
  return practicas;
};
getPracticas().then((practicas) => {
  console.log(practicas.map((x) => x.attributes.perks));
  practicas.sort(
    (x, y) => x.attributes.published_at - y.attributes.published_at
  );
  practicas.map((practica) => {
    const {
      attributes: {
        published_at: published,
        title,
        description_headline: descHeadline,
        description,
        projects,
        functions_headline: funcHeadline,
        functions,
        desirable_headline: desHeadline,
        desirable,
        benefits_headline: benefHeadline,
        benefits,
      },
      links: { public_url: publicURL },
    } = practica;
    console.log("<hr>");
    console.log("<hr>");
    console.log(`<h1>${title}</h1>`.red);
    console.log(`<li>${new Date(published * 1000)}</li>`.red);
    console.log(`<li>${publicURL}</li>`.blue);
    console.log(projects);
    console.log(`<h2>${descHeadline}</h2>`.green);
    console.log(description);
    console.log(`<h2>${funcHeadline}</h2>`.green);
    console.log(functions);
    console.log(`<h2>${desHeadline}</h2>`.green);
    console.log(desirable);
    console.log(`<h2>${benefHeadline}</h2>`.green);
    console.log(`${benefits}`);
  });
});
