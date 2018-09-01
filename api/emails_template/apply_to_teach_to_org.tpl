Hey there a new Teacher <%- params.firstName %> <%- params.lastName %> did apply!

Here his details:
<% for(let k in params) {%>
<%- k %>:
--
<%- params[k] %>

<% } %>