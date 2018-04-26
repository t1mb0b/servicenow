# servicenow
My Servicenow Code Snippets

This is not organized in any way (yet). Hope to organize one day!

Some of these I wrote myself, others I have saved from community or Slack channel conversations. 

///

Get Transaction List:

snowUrl/v_cluster_transaction_list.do?sysparm_query=%5EGROUPBYnode_id

///

like all best practices - knowing why its bad is important - and when it is appropriate - 
why is it bad - well in before business rules, you don't need it, updates to fields for the current record in a before business rule are saved as part of the execution
in after business rules - you should in general be working on *other* records once your record is finished updating its values
the reason to avoid it is, it will execute the record update engine for that record again, and can cause loops (though SN detects and aborts these now, mostly)
the times its hard to avoid is when you have very specific engine ordering issues, and its nearly the only way.

///

Method A: Comment out code, and adding notes stating why you change it
Method B: Inactivate if possible, then, Copy. This is hard to see if anything has been added to the OOB because deactivating doesn't trigger a customer update.
Method C: Add Comment stating you are making a copy, inactivate it. Copy it. This will ensure the OOB thing comes up in a skipped update.

///

1.  Using OOB more than customization.
2.  Stop trying to replicate the old manual method exactly in the digitized world.
3.  Take the time optimize and enhance the current manual method prior designing the digital method
4.  Establish reasonable goals, with enough time to complete them
5.  If you hire 3rd party:
     a.  if they say that is a bad idea, find out why
     b.  if they show you why and you don't care, review again to see why you need it
     c.  get documentation on what they built so you know how to support it without having to research everything when it has an issue
     d.  make sure they test `without admin or themselves`
      e.  make sure you test without admin or as yourself
6.  stop trying to rebuild exactly what you had in your last itsm platform/tool:  landesk, cherwell, bmc, etc.  Do it better in SN.  If that tool was so great, why leave it?

