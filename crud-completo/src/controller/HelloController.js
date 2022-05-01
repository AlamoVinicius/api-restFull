class HelloController {
  async index(req, res) {
    return res.json({ hello: "ok test route" });
  }
}

export default new HelloController();
