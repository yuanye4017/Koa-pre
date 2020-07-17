   /*------------ 注册 -------------*/
   /**
   * @swagger
   * definitions:
   *   Register:
   *     required:
   *       - user_account
   *       - user_password
   *     properties:
   *       user_account:
   *         type: string
   *       user_password:
   *         type: string
   */
  /**
   * @swagger
   * /user/register:
   *   post:
   *     description: 用户注册
   *     tags: [用户模块]
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: user_account
   *         description: 用户名.
   *         in: formData
   *         required: true
   *         type: string
   *       - name: user_password
   *         description: 用户密码.
   *         in: formData
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: 注册成功
   *         schema:
   *           type: object
   *           $ref: '#/definitions/Register'
   *   
   */

  /*------------ 登陆 -------------*/
  /**
   * @swagger
   * definitions:
   *   Login:
   *     required:
   *       - user_account
   *       - user_password
   *     properties:
   *       user_account:
   *         type: string
   *       user_password:
   *         type: string
   */

  /**
   * @swagger
   * /user/login:
   *   post:
   *     description: 用户登入
   *     tags: [用户模块]
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: user_account
   *         description: 用户名.
   *         in: formData
   *         required: true
   *         type: string
   *       - name: user_password
   *         description: 用户密码.
   *         in: formData
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: 登入成功
   *         schema:
   *           type: object
   *           $ref: '#/definitions/Login'
   *   
   */

/*------------ 获取用户信息 ---------------*/ 
/**
   * @swagger
   * /user/getUserInfo:
   *   post:
   *     description: 获取用户信息
   *     tags: [用户模块]
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: 获取用户信息成功
   *         schema:
   *           type: object
   *   
   */

