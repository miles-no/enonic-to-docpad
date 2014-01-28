<xsl:stylesheet version="2.0" xmlns="http://www.w3.org/1999/xhtml" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output encoding="utf-8" indent="yes" method="xml" omit-xml-declaration="yes"/>
	<xsl:param name="content">
		<type>object</type>
	</xsl:param>
	<xsl:template match="/">
		<xsl:value-of disable-output-escaping="yes" select="$content"/>
	</xsl:template>
</xsl:stylesheet>