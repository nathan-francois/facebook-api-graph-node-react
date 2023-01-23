const express = require("express");
const router = express.Router();
const FB = require("fb");
var moment = require("moment");
FB.setAccessToken(process.env.PAGE_ACCESS_TOKEN);

/**
 * Utiliser cette fonction pour effectuer des appel à l'API Graph de facebook
 * @param {string} uri L'URI de la requete (ex: /object_id/feed)
 * @returns response || response.error
 */
async function getFacebookApiInfo(uri) {
	return new Promise((resolve, reject) => {
		FB.api(uri, "GET", {}, (response) => {
			if (response.error) {
				reject(response.error);
			}
			resolve(response.data);
		});
	});
}

router.get("/posts", async (req, res) => {
	const posts = await getFacebookApiInfo(`/${process.env.PAGE_ID}/posts`);
	let postsFormated = [];

	for (let i = 0; i < posts.length; i++) {
		const insight = await getFacebookApiInfo(`/${posts[i].id}/insights?metric=post_reactions_by_type_total,post_impressions`);

		postsFormated[i] = {
			id: posts[i].id,
			createdAt: moment(posts[i].created_time).format("DD/MM/YYYY HH:MM:ss"),
			message: posts[i].message,
			postReactionsByTypeTotal: insight[0].values[0].value,
			postImpressions: insight[1].values[0].value,
		};
	}

	return res.status(200).json(postsFormated);
});

module.exports = router;
