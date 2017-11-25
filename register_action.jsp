<%@include file="db.jsp" %><%
//get form input
String user = request.getParameter( "user" );
out.println(user);
String fullname = request.getParameter( "fullname" );
String pass = request.getParameter( "pass" ); 
 
String sqlStr = "insert into users(username, fullname, password) values ('" + user + "', '" + fullname  + "', '"+ pass + "')";
Statement stmt = con.createStatement();
stmt.execute(sqlStr);
out.println("Done"); 
%>


<!-- 
String sqlStr = "insert into users(username, fullname, password) values (?,? ?)";
PreparedStatement stmt = con.prepareStatement(sqlStr);
stmt.setString(1,username);
stmt.setString(2,fullname);
stmt.setString(3,pass);
ResultSet rs = stmt.execute(); -->