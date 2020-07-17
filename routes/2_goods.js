/*------------ 增加商品 ---------------*/ 
/**
   * @swagger
   * /goods/addGoods:
   *   post:
   *     description: 添加商品
   *     tags: [商品模块]
   *     produces:
   *       - application/form-data
   *     parameters:
   *       - name: goods_name
   *         description: 商品名.
   *         in: formData
   *         required: true
   *         type: string
   *       - name: goods_price
   *         description: 商品价格.
   *         in: formData
   *         required: true
   *         type: string
   *       - name: goods_info
   *         description: 商品描述.
   *         in: formData
   *         type: strings
   *       - name: file
   *         description: 商品图片.
   *         in: formData
   *         type: file
   *     responses:
   *       200:
   *         description: 添加商品成功
   *         schema:
   *           type: object
   *   
   */
/*------------ 获取商品信息 ---------------*/ 
/**
   * @swagger
   * /goods/getGoodsList:
   *   post:
   *     description: 获取商品列表
   *     tags: [商品模块]
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: 获取商品列表成功
   *         schema:
   *           type: object
   *   
   */