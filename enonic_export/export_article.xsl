<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet exclude-result-prefixes="#all" version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:portal="http://www.enonic.com/cms/xslt/portal" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output encoding="UTF-8" indent="yes" method="xml" omit-xml-declaration="no"/>
    <xsl:include href="export_common.xsl"/>

    <xsl:template match="/result/contents/content">
        <xsl:variable name="author" select="/result/people/contents/content[@key = current()/contentdata/forfatter/content/@key]"/>

        <xsl:element name="item">
            <xsl:element name="title">
                <xsl:value-of select="contentdata/heading"/>
            </xsl:element>
            <xsl:element name="link">
                <xsl:value-of select="portal:createContentUrl(@key, ())"/>
            </xsl:element>
            <xsl:element name="ingress">
                <xsl:value-of select="contentdata/preface"/>
            </xsl:element>
            <xsl:apply-templates select="contentdata/text"/>
            <xsl:if test="contentdata/file != ''">
                <xsl:apply-templates select="contentdata/file"/>
            </xsl:if>
            <xsl:element name="published">
                <xsl:value-of select="concat(format-dateTime(dateTime(xs:date(tokenize(@publishfrom, '\s+')[1]), xs:time(concat(tokenize(@publishfrom, '\s+')[2], ':00Z'))), $date-format-string), ' ', $timezone)"/>
            </xsl:element>
            <xsl:element name="author">
                <xsl:value-of select="concat($author/contentdata/navn, ' ', $author/contentdata/etternavn)"/>
            </xsl:element>
            <xsl:element name="location">
                <xsl:value-of select="contentdata/kontor"/>
            </xsl:element>
            <xsl:if test="contentdata/images">
                <xsl:apply-templates select="contentdata/images"/>
            </xsl:if>
        </xsl:element>
    </xsl:template>

    <xsl:template match="contentdata/text">
        <xsl:element name="text">
            <xsl:text disable-output-escaping="yes">&lt;![CDATA[</xsl:text>
            <xsl:copy-of select="child::node()"/>
            <xsl:text disable-output-escaping="yes">]]&gt;</xsl:text>
        </xsl:element>
    </xsl:template>

    <xsl:template match="contentdata/file">
        <xsl:element name="files">
            <!-- TODO: iterate through all file attachments (only one is used today though) -->
            <xsl:element name="file">
                <xsl:element name="url">
                    <xsl:value-of select="portal:createAttachmentUrl(file/file/@key)"/>
                </xsl:element>
                <xsl:element name="description">
                    <xsl:value-of select="description"/>
                </xsl:element>
            </xsl:element>
        </xsl:element>
    </xsl:template>

    <!-- Handle ingress image. The rest of the images are included in the article text -->
    <xsl:template match="contentdata/images">
        <xsl:element name="image">
            <xsl:value-of select="portal:createImageUrl(image[1]/@key)"/>
        </xsl:element>
        <xsl:element name="imagetitle">
            <xsl:value-of select="image[1]/text"/>
        </xsl:element>
    </xsl:template>

</xsl:stylesheet>
