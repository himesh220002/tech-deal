// backend/routes/payments/verify.js
router.get("/latest", async (req, res) => {
  const result = await drizzle.select().from(payments).orderBy(payments.created_at.desc()).limit(1);
  res.json(result);
});
