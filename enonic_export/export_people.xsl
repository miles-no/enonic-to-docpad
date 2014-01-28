<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet exclude-result-prefixes="#all" version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:portal="http://www.enonic.com/cms/xslt/portal" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output encoding="UTF-8" indent="yes" method="xml" omit-xml-declaration="no"/>

    <xsl:include href="export_common.xsl"/>

    <xsl:template match="/result/contents/content">
        <xsl:element name="item">
            <xsl:element name="firstname">
                <xsl:value-of select="contentdata/navn"/>
            </xsl:element>
            <xsl:element name="lastname">
                <xsl:value-of select="contentdata/etternavn"/>
            </xsl:element>
            <xsl:element name="role">
                <xsl:value-of select="/result/roles/contents/content[@key = current()/contentdata/rolle/content/@key]/contentdata/rolle"/>
            </xsl:element>
            <xsl:element name="quit">
                <xsl:value-of select="contentdata/sluttet"/>
            </xsl:element>
            <xsl:element name="link">
                <xsl:value-of select="portal:createContentUrl(@key, ())"/>
            </xsl:element>
            <xsl:element name="text">
                <xsl:value-of select="contentdata/text"/>
            </xsl:element>
            <xsl:element name="socialtext">
                <xsl:value-of select="contentdata/sosialtekst"/>
            </xsl:element>
            <xsl:element name="location">
                <xsl:value-of select="location/site/contentlocation/@menuitem-display-name"/>
            </xsl:element>
            <xsl:if test="contentdata/twitter != ''">
                <xsl:element name="twitter">
                    <xsl:value-of select="contentdata/twitter"/>
                </xsl:element>
            </xsl:if>
            <xsl:if test="contentdata/linkedin != ''">
                <xsl:element name="linkedin">
                    <xsl:value-of select="contentdata/linkedin"/>
                </xsl:element>
            </xsl:if>
            <xsl:if test="contentdata/blogg != ''">
                <xsl:element name="blog">
                    <xsl:value-of select="contentdata/blogg"/>
                </xsl:element>
            </xsl:if>
            <xsl:if test="contentdata/github != ''">
                <xsl:element name="github">
                    <xsl:value-of select="contentdata/github"/>
                </xsl:element>
            </xsl:if>
            <xsl:if test="contentdata/googleplus != ''">
                <xsl:element name="googleplus">
                    <xsl:value-of select="contentdata/googleplus"/>
                </xsl:element>
            </xsl:if>

            <xsl:if test="contentdata/artikler/artikkelurl != ''">
                <xsl:element name="articles">
                    <xsl:apply-templates select="contentdata/artikler"/>
                </xsl:element>
            </xsl:if>

            <xsl:if test="contentdata/foredrag/foredragurl != ''">
                <xsl:element name="presentations">
                    <xsl:apply-templates select="contentdata/foredrag"/>
                </xsl:element>
            </xsl:if>
        </xsl:element>
    </xsl:template>

    <xsl:template match="artikler">
        <xsl:element name="article">
            <xsl:element name="url">
                <xsl:value-of select="artikkelurl"/>
            </xsl:element>
            <xsl:element name="description">
                <xsl:value-of select="artikkelbeskrivelse"/>
            </xsl:element>
        </xsl:element>
    </xsl:template>

    <xsl:template match="foredrag">
        <xsl:element name="presentation">
            <xsl:element name="url">
                <xsl:value-of select="foredragurl"/>
            </xsl:element>
            <xsl:element name="description">
                <xsl:value-of select="foredragbeskrivelse"/>
            </xsl:element>
        </xsl:element>
    </xsl:template>
</xsl:stylesheet>
