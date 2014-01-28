<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet exclude-result-prefixes="#all" version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:portal="http://www.enonic.com/cms/xslt/portal" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output encoding="UTF-8" indent="yes" method="xml" omit-xml-declaration="no"/>

    <xsl:include href="export_common.xsl"/>

    <xsl:template match="/result/contents/content">

        <xsl:variable name="author" select="/result/people/contents/content[@key = current()/contentdata/forfatter/content/@key]"/>

        <xsl:element name="item">
            <xsl:element name="title">
                <xsl:value-of select="contentdata/tittel"/>
            </xsl:element>
            <xsl:element name="date">
                <xsl:value-of select="contentdata/dato"/>
            </xsl:element>
            <xsl:element name="link">
                <xsl:value-of select="portal:createContentUrl(@key, ())"/>
            </xsl:element>
            <xsl:element name="ingress">
                <xsl:value-of select="contentdata/ingress"/>
            </xsl:element>
            <xsl:element name="source">
                <xsl:value-of select="contentdata/tidsskrift"/>
            </xsl:element>
            <xsl:element name="file">
                <xsl:value-of select="portal:createAttachmentUrl(contentdata/fil/file/@key)"/>
            </xsl:element>
            <xsl:element name="published">
                <xsl:value-of select="concat(format-dateTime(dateTime(xs:date(tokenize(@publishfrom, '\s+')[1]), xs:time(concat(tokenize(@publishfrom, '\s+')[2], ':00Z'))), $date-format-string), ' ', $timezone)"/>
            </xsl:element>
        </xsl:element>
    </xsl:template>
</xsl:stylesheet>
