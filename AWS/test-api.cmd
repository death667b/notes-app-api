apig-test \
--username='admin@spinnys.com' \
--password='R0660ver^' \
--user-pool-id='ap-southeast-2_bvWqZeTFk' \
--app-client-id='5r1111n8f1dipd90nkgni81qos' \
--cognito-region='ap-southeast-2' \
--identity-pool-id='ap-southeast-2:42933e86-25aa-4dc8-8384-c084a4bf7877' \
--invoke-url='https://ohzexixk93.execute-api.ap-southeast-2.amazonaws.com/prod' \
--api-gateway-region='ap-southeast-2' \
--path-template='/notes' \
--method='POST' \
--body='{"content":"hello world2","attachment":"2hello.jpg"}'