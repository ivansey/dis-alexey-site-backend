const router = require("express").Router();

router.use(`/users`, require(`./users`));
router.use(`/users/auth`, require(`./authUser`));
router.use(`/works`, require(`./works`));
router.use(`/orders`, require(`./orders`));

module.exports = router;