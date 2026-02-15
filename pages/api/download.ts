import { NextApiRequest, NextApiResponse } from 'next';
import JSZip from 'jszip';

/**
 * pages/api/download/[id].ts
 * Endpoint for downloading generated game ZIP files
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Game ID is required' });
  }

  try {
    // In production, fetch game data from Supabase
    // const { data, error } = await supabase
    //   .from('generated_games')
    //   .select('*')
    //   .eq('id', id)
    //   .single();

    // For now, create a mock ZIP with a message
    const zip = new JSZip();

    // Add main game script
    zip.file(
      'game_main.lua',
      `-- Generated Roblox Game\n-- Download and extract this file\n-- Copy the Lua code into Roblox Studio\n-- Game ID: ${id}`
    );

    // Add a README
    zip.file(
      'README.md',
      `# Roblox Game Files\n\nGame ID: ${id}\n\n## Installation\n\n1. Extract this ZIP file\n2. Open Roblox Studio\n3. Create a new place\n4. Insert a new Script in Workspace\n5. Copy the contents of game_main.lua into the script\n6. Save and test\n\n## Support\n\nFor support, visit our documentation or join our Discord community.`
    );

    // Generate the ZIP
    const blob = await zip.generateAsync({ type: 'arraybuffer' });

    // Send the ZIP file
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename="game_${id}.zip"`);
    res.status(200).send(Buffer.from(blob));
  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ error: 'Failed to generate download' });
  }
}
