workflow.info("Agreement " + current.agreement_number);
workflow.info("Void Reason" + current.void_reason);
workflow.info("Void_reason_explanation " + current.void_reason_explanation);
workflow.info("SNOW Agreement" + current.number);

try {
    var obj = ecommUtil.cancelAgreementSupportManager(
        current.agreement_number,
        172356, //the person id of the user requesting the void
        current.void_reason,
        current.void_reason_explanation,
        current.number//the servicenow request number
    );
} catch (error) {
    workflow.error("Error in the leapdbUtil" + error);
}

//script include
  cancelAgreementSupportManager: function (agreement_number, person_id, void_reason, void_explanation, snow_request_number) {
        var responseBody, responseError;

        var body = {};
        body.VoidReason = void_reason;
        body.AgreementNumber = agreement_number;
        body.AssociatePersonId = person_id;
        body.VoidReasonExplanation = void_explanation;
        body.ServiceNowTicketNumber = snow_request_number;
	
        try {
            //https://directservicedev.aarons.com/ServiceNowCancelEcommOrderRequest 
            var r = new sn_ws.RESTMessageV2('eCommerce Payment Void - Cancel SM', 'create');
            r.setMIDServer(gs.getProperty('mid.server.rba_default'));
            r.setRequestHeader('Content-Type', 'application/json');
            r.setRequestHeader('Accept', 'application/json');
            r.setRequestBody(JSON.stringify(body));
            r.setHttpTimeout(30000);

            var response = r.execute();
            response.waitForResponse(60);
            responseBody = response.getBody();
            workflow.info("Response from webservice: " + responseBody);

            responseError = response.haveError() ? response.getErrorMessage() : response.getBody();
            var responseStatus = response.getStatusCode();

            if (responseStatus != 200) {
                responseBody = '';
                throw responseError;
            }

        } catch (ex) {
            responseError = ex + "";
            workflow.error('eCommerce payment void webservice to cancel in support manager', ex);
        } finally {
            return (responseBody) ? responseBody : '{"error":"' + responseError + '"}';
        }
